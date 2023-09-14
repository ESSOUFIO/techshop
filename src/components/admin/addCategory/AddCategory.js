import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddCategory.module.scss";
import Card from "../../card/Card";
import { IoClose } from "react-icons/io5";
import { Timestamp, doc, updateDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ProgressBar } from "react-bootstrap";
import { useParams } from "react-router";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import spinner from "../../../assets/images/loader/Spinner.png";

const initState = {
  id: "",
  name: "",
  image: null,
};

/** =========    AddCategory    ======== */
const AddCategory = () => {
  const [category, setCategory] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const inputFileRef = useRef();
  const navigate = useNavigate();

  const { id } = useParams();
  const categoryDoc = useFetchDocument("categories", id);

  //Handle Page Mode: "Edit Product" or "Add New Product"
  useEffect(() => {
    if (id !== "new") {
      setCategory(categoryDoc.data);
      setEditMode(true);
    } else {
      setCategory({ ...initState });
      setEditMode(false);
    }
  }, [id, categoryDoc.data]);

  const addImage = (file) => {
    if (!file) return;

    if (category.image !== null) deleteImg(category.image.id);

    const imageId = Date.now() + file.name;
    setUpLoading(true);

    //** upload to Storage */
    const storageRef = ref(storage, `categories/${imageId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const newImg = {
              id: imageId,
              url: downloadURL,
            };
            setCategory({ ...category, image: newImg });
          })
          .finally(() => setUpLoading(false));
      }
    );
  };

  const deleteImg = (id) => {
    setCategory({ ...category, image: null });

    //Delete from storage
    const imageRef = ref(storage, `categories/${id}`);
    deleteObject(imageRef);
  };

  const inputHandler = (target) => {
    setCategory({
      ...category,
      [target.name]: target.value,
    });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prodRef = doc(db, "categories", id);
      await updateDoc(prodRef, category);
      toast.success("Category edited successfully.");
      navigate("/admin/categories");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProd = {
        ...category,
        createdAt: Timestamp.now().toDate(),
      };

      await setDoc(doc(db, "categories", newProd.id), newProd);
      // categoryRef.current.clearValue();
      toast.success("New Category added successfully.");
      setCategory({ ...initState });
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  //Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.addCategory}>
        <h2>{editMode ? "Edit Category" : "Add New Category"}</h2>
        {categoryDoc.isLoading ? (
          <div>
            <img src={spinner} alt="Loading.." width={100} />
          </div>
        ) : (
          category && (
            <Card cardClass={styles.card}>
              <form onSubmit={editMode ? editHandler : addProductHandler}>
                <label>Category ID</label>
                <input
                  className="form-item"
                  type="text"
                  placeholder="Category ID"
                  name="id"
                  value={category.id}
                  required={true}
                  onChange={(e) => inputHandler(e.target)}
                  disabled={editMode}
                />

                <label>Category Name</label>
                <input
                  className="form-item"
                  type="text"
                  placeholder="Category Name"
                  name="name"
                  value={category.name}
                  required={true}
                  onChange={(e) => inputHandler(e.target)}
                />

                <label>Category Image</label>
                <input
                  className="form-item"
                  type="file"
                  accept="image/*"
                  onChange={(e) => addImage(e.target.files[0])}
                  ref={inputFileRef}
                  style={{ display: "none" }}
                />

                <div className={styles.imagesWrap}>
                  <div className={styles.container}>
                    {category.image && (
                      <div className={styles.categoryImage}>
                        <img
                          src={category.image.url}
                          alt={category.name}
                          width={100}
                        />
                        <IoClose
                          size={18}
                          className={styles.closeIcon}
                          onClick={() => deleteImg(category.image.id)}
                        />
                      </div>
                    )}
                  </div>
                  {progress !== 0 && progress !== 100 && (
                    <ProgressBar
                      now={progress}
                      style={{ margin: "5px 0", height: "10px" }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => inputFileRef.current.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Add image"}
                  </button>
                </div>

                <div className={styles.btn}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!category.name || !category.image}
                  >
                    {editMode ? "Edit Category" : "Add Category"}
                  </button>
                </div>
              </form>
            </Card>
          )
        )}
      </div>
      {loading && <Loader />}
    </>
  );
};

export default AddCategory;
