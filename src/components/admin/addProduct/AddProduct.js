import React, { useRef, useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

const ProductImage = ({ image, id, deleteImg }) => {
  return (
    <div className={styles.productImage}>
      <img src={image.url} alt="" width={100} />
      <IoClose
        size={18}
        className={styles.closeIcon}
        onClick={() => deleteImg(id)}
      />
    </div>
  );
};

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const inputFileRef = useRef();
  const categoryRef = useRef();

  const resetForm = () => {
    setName("");
    setDesc("");
    setCategory(null);
    setPrice("");
    setBrand("");
  };

  const options = [
    { value: "audio", label: "Audio" },
    { value: "home", label: "Home" },
    { value: "tv", label: "TV" },
  ];

  const addFile = (file) => {
    const newFile = {
      local: file,
      url: URL.createObjectURL(file),
    };
    let array = Array.from(images);
    array.push(newFile);
    setImages(array);
  };

  const deleteImg = (index) => {
    const array = Array.from(images);
    array.splice(index, 1);
    setImages(array);
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    const newProd = {
      name,
      price,
      brand,
      category,
      desc,
    };
    setLoading(true);
    await addDoc(collection(db, "products"), newProd);
    resetForm();
    categoryRef.current.clearValue();
    toast.success("New Product added successfully.");
    setLoading(false);
  };

  console.log(category);
  return (
    <>
      <div className={styles.addProduct}>
        <h2>Add New Product</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={addProductHandler}>
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Product Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => addFile(e.target.files[0])}
              ref={inputFileRef}
              style={{ display: "none" }}
            />
            <div className={styles.imagesWrap}>
              <div className={styles.container}>
                {images.map((image, index) => {
                  return (
                    <ProductImage
                      key={index}
                      image={image}
                      id={index}
                      deleteImg={deleteImg}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => inputFileRef.current.click()}
              >
                Add image*
              </button>
            </div>
            <p
              style={{ color: "gray", fontSize: "12px", marginBottom: "10px" }}
            >
              * Each product must have at least 2 images
            </p>

            <label>Price ($)</label>
            <input
              className={styles.price}
              type="number"
              placeholder="Price"
              value={price}
              required={true}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <label>Brand</label>
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label>Category</label>
            <Select
              ref={categoryRef}
              className={styles.select}
              defaultValue={category}
              onChange={(e) => setCategory(e?.value)}
              options={options}
              placeholder="Choose Category"
            />

            <label>Description</label>
            <textarea
              rows={5}
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className={styles.btn}>
              <button
                type="submit"
                disabled={!name || !price || !images.length}
              >
                Add Product
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
