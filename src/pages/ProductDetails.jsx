// ProductDetails.js
import React, { useEffect, useState } from "react";
import { InputNumber, Select , Tag, message  } from "antd";
import axios from "axios";

const { Option } = Select;

function ProductDetails() {
  const [colors, setColors] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  
  const [sizes, setSizes] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    fetchColorsFromServer();
    fetchSizesFromServer();
  }, []);

  const fetchColorsFromServer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/colors");
      setColors(response.data.data);

      const colorOptions = response.data.data.map((e) => {
        return { value: e.id, label: e.color_name };
      });

      setColorOptions(colorOptions);
      console.log(colorOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSizesFromServer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/sizes");
      setSizes(response.data.size);

      const sizeOptions = response.data.size.map((e) => {
        return { value: e.id, label: e.size };
      });

      setSizeOptions(sizeOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorChange = (selectedValues) => {
    setSelectedColors(selectedValues);
    console.log(selectedValues);
  console.log(selectedColors);
  };

  const handleSizeChange = (selectedValues) => {
    setSelectedSizes(selectedValues);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag color="blue" onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose}>
        {label}
      </Tag>
    );
  };

  return (
    <>
      <label htmlFor="colors" className="fw-bold">
        Product Colors
      </label>
      <Select
        size="large"
        mode="multiple"
        name="colors"
        showArrow
        tagRender={tagRender}
        defaultValue={[]}
        style={{ width: "100%" }}
        options={colorOptions}
        onChange={handleColorChange}
      />

      <label htmlFor="sizes" className="fw-bold">
        Product Sizes
      </label>
      <Select
        size="large"
        mode="multiple"
        name="sizes"
        showArrow
        tagRender={tagRender}
        defaultValue={[]}
        style={{ width: "100%" }}
        value={selectedSizes}
        options={sizeOptions}
        onChange={handleSizeChange}
      />

      <label htmlFor="quantity" className="fw-bold">
        Product quantity
      </label>
      <InputNumber size="large" name="quantity" placeholder="Product quantity" addonBefore="+"  defaultValue={100} />
      <label htmlFor="price" className="fw-bold">
        Product Price
      </label>
      <InputNumber size="large" name="price" placeholder="Product price" addonBefore="+" addonAfter="$" defaultValue={100} />
    </>
  );
}

export default ProductDetails;
