import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
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

const ProductImage = ({ image, id, index, deleteImg }) => {
  return (
    <div className={styles.productImage}>
      <img src={image.url} alt="" width={100} />
      <IoClose
        size={18}
        className={styles.closeIcon}
        onClick={() => deleteImg(id, index)}
      />
    </div>
  );
};

const AddProduct = () => {
  const initState = {
    name: "",
    brand: "",
    desc: "",
    price: 0,
    newPrice: "",
    offValue: "",
    images: [],
    category: "",
    banner: "",
  };

  const [product, setProduct] = useState(initState);

  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const inputFileRef = useRef();
  const categoryRef = useRef();
  const bannerRef = useRef();
  const navigate = useNavigate();

  const { id } = useParams();

  //Handle Page Mode: "Edit Product" or "Add New Product"
  useEffect(() => {
    const getProduct = async (id) => {
      setLoading(true);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ ...docSnap.data() });
      } else {
        toast.error("Product not found!");
      }
      setLoading(false);
    };

    if (id !== "new") {
      getProduct(id);
      setEditMode(true);
    } else {
      setProduct({ ...initState });
      setEditMode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const categoryOptions = [
    { value: "Audio", label: "Audio" },
    { value: "Home", label: "Home" },
    { value: "TV", label: "TV" },
    { value: "Phone", label: "Phone" },
  ];

  const bannerOptions = [
    { value: "Flash Deal", label: "Flash Deal" },
    { value: "New Products", label: "New Products" },
    { value: "Top Televisions", label: "Top Televisions" },
  ];

  const addImage = (file) => {
    if (!file) return;

    const imageId = Date.now() + file.name;
    setUpLoading(true);

    //** upload to Storage */
    const storageRef = ref(storage, `products/${imageId}`);
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
            let array = Array.from(product.images);
            array.push({
              id: imageId,
              url: downloadURL,
            });
            setProduct({ ...product, images: array });
          })
          .finally(() => setUpLoading(false));
      }
    );
  };

  const deleteImg = (id, index) => {
    const array = Array.from(product.images);
    array.splice(index, 1);
    setProduct({ ...product, images: array });

    //Delete from storage
    const imageRef = ref(storage, `products/${id}`);
    deleteObject(imageRef);
  };

  const inputHandler = (target) => {
    setProduct({
      ...product,
      [target.name]: target.value,
    });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prodRef = doc(db, "products", id);
      await updateDoc(prodRef, product);
      toast.success("Product edited successfully.");
      navigate("/admin/products");
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
        ...product,
        price: Number(product.price),
        newPrice: Number(product.newPrice),
        offValue: Number(product.offValue),
        createdAt: Timestamp.now().toDate(),
      };

      await addDoc(collection(db, "products"), newProd);
      // categoryRef.current.clearValue();
      toast.success("New Product added successfully.");
      setProduct({ ...initState });
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const newPrice = product.price * (1 - product.offValue / 100);
    setProduct({ ...product, newPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.price, product.offValue]);

  return (
    <>
      <div className={styles.addProduct}>
        <h2>Add New Product</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={editMode ? editHandler : addProductHandler}>
            <label>Product Name</label>
            <input
              className="form-item"
              type="text"
              placeholder="Product Name"
              name="name"
              value={product.name}
              required={true}
              onChange={(e) => inputHandler(e.target)}
            />

            <label>Product Images</label>
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
                {product.images.map((image, index) => {
                  return (
                    <ProductImage
                      key={index}
                      image={image}
                      id={image.id}
                      index={index}
                      deleteImg={deleteImg}
                    />
                  );
                })}
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
                {uploading ? "Uploading..." : "Add image*"}
              </button>
            </div>
            <p
              style={{ color: "gray", fontSize: "12px", marginBottom: "10px" }}
            >
              * Each product must have at least 2 images
            </p>

            <div className={styles.priceWrap}>
              <div className={styles.price}>
                <label>Price ($)</label>
                <input
                  className={`form-item ${styles.price}`}
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  required={true}
                  onChange={(e) => inputHandler(e.target)}
                />
              </div>

              <div className={styles.price}>
                <label>OFF Value (%)</label>
                <input
                  className={`form-item ${styles.price}`}
                  type="number"
                  name="offValue"
                  placeholder="OFF Value"
                  value={product.offValue}
                  onChange={(e) => inputHandler(e.target)}
                />
              </div>

              <div className={styles.price}>
                <label>New Price ($)</label>
                <input
                  className={`form-item ${styles.price}`}
                  type="number"
                  name="newPrice"
                  placeholder="New Price"
                  value={product.newPrice}
                  onChange={(e) => inputHandler(e.target)}
                  disabled
                />
              </div>
            </div>

            <label>Brand</label>
            <input
              className="form-item"
              type="text"
              name="brand"
              placeholder="Brand"
              value={product.brand}
              onChange={(e) => inputHandler(e.target)}
            />

            <label>Category</label>
            <Select
              ref={categoryRef}
              value={{ value: product.category, label: product.category }}
              className={styles.select}
              onChange={(e) => setProduct({ ...product, category: e?.value })}
              options={categoryOptions}
              placeholder="Choose Category"
            />

            <label>Banner</label>
            <Select
              ref={bannerRef}
              value={{ value: product.banner, label: product.banner }}
              className={styles.select}
              onChange={(e) => setProduct({ ...product, banner: e?.value })}
              options={bannerOptions}
              placeholder="Choose Banner"
            />

            <label>Description</label>
            <textarea
              className="form-item"
              rows={5}
              name="desc"
              placeholder="Description"
              value={product.desc}
              onChange={(e) => inputHandler(e.target)}
            />
            <div className={styles.btn}>
              <button
                type="submit"
                disabled={
                  !product.name || !product.price || !product.images.length
                }
              >
                {editMode ? "Edit Product" : "Add Product"}
              </button>
            </div>
          </form>
        </Card>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default AddProduct;
