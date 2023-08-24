import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddBrand.module.scss";
import Card from "../../card/Card";
import { IoClose } from "react-icons/io5";
import { Timestamp, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
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

/** =========    AddCategory    ======== */
const AddBrand = () => {
  const initState = {
    name: "",
    image: null,
  };

  const [brand, setBrand] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const inputFileRef = useRef();
  const navigate = useNavigate();

  const { id } = useParams();

  //Handle Page Mode: "Edit Product" or "Add New Product"
  useEffect(() => {
    const getBrand = async (id) => {
      setLoading(true);
      console.log(id);
      const docRef = doc(db, "brands", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBrand({ ...docSnap.data() });
      } else {
        toast.error("Brand not found!");
      }
      setLoading(false);
    };

    if (id !== "new") {
      getBrand(id);
      setEditMode(true);
    } else {
      setBrand({ ...initState });
      setEditMode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addImage = (file) => {
    if (!file) return;

    if (brand.image !== null) deleteImg(brand.image.id);

    const imageId = Date.now() + file.name;
    setUpLoading(true);

    //** upload to Storage */
    const storageRef = ref(storage, `brands/${imageId}`);
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
            setBrand({ ...brand, image: newImg });
          })
          .finally(() => setUpLoading(false));
      }
    );
  };

  const deleteImg = (id) => {
    setBrand({ ...brand, image: null });

    //Delete from storage
    const imageRef = ref(storage, `brands/${id}`);
    deleteObject(imageRef);
  };

  const inputHandler = (target) => {
    setBrand({
      ...brand,
      [target.name]: target.value,
    });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prodRef = doc(db, "brands", id);
      await updateDoc(prodRef, brand);
      toast.success("Brand edited successfully.");
      navigate("/admin/brands");
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
        ...brand,
        createdAt: Timestamp.now().toDate(),
      };

      await setDoc(doc(db, "brands", newProd.name), newProd);
      // categoryRef.current.clearValue();
      toast.success("New Brand added successfully.");
      setBrand({ ...initState });
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
      <div className={styles.addBrand}>
        <h2>{editMode ? "Edit Brand" : "Add New Brand"}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={editMode ? editHandler : addProductHandler}>
            <label>Brand Name</label>
            <input
              className="form-item"
              type="text"
              placeholder="Brand Name"
              name="name"
              value={brand.name}
              required={true}
              onChange={(e) => inputHandler(e.target)}
              disabled={editMode}
            />

            <label>Brand Image</label>
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
                {brand.image && (
                  <div className={styles.brandImage}>
                    <img src={brand.image.url} alt={brand.name} width={100} />
                    <IoClose
                      size={18}
                      className={styles.closeIcon}
                      onClick={() => deleteImg(brand.image.id)}
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
                disabled={!brand.name || !brand.image}
              >
                {editMode ? "Edit Brand" : "Add Brand"}
              </button>
            </div>
          </form>
        </Card>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default AddBrand;
