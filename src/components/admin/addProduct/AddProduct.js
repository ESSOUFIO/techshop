import React, { useRef, useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import Select from "react-select";
import { IoClose } from "react-icons/io5";

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
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);

  const inputFileRef = useRef();

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

  const addProductHandler = (e) => {
    e.preventDefault();
    console.log(images, title, desc, price, brand, category);
  };

  return (
    <div className={styles.addProduct}>
      <h2>Add New Product</h2>
      <Card cardClass={styles.card}>
        <form onSubmit={addProductHandler}>
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            required={true}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Product Image</label>
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
            <button onClick={() => inputFileRef.current.click()}>
              Add minimum 2 images
            </button>
          </div>

          <label>Price</label>
          <input
            className={styles.price}
            type="number"
            placeholder="Price"
            required={true}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label>Brand</label>
          <input
            type="text"
            placeholder="Brand"
            required={true}
            onChange={(e) => setBrand(e.target.value)}
          />

          <label>Category</label>
          <Select
            className={styles.select}
            defaultValue={category}
            onChange={(e) => setCategory(e.value)}
            options={options}
            placeholder="Choose Category"
          />

          <label>Description</label>
          <textarea
            rows={5}
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className={styles.btn}>
            <button>Add Product</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
