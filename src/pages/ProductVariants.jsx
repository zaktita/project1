import React from "react";
import { Input, Button } from "antd";

const { TextArea } = Input;

const ProductVariants = ({ variants, addVariant, removeVariant, handleVariantChange }) => {
  return (
    <div>
      <h3>Variants</h3>
      {variants.map((variant, index) => (
        <div key={index} className="d-flex gap-3">
          <Input
            placeholder="Variant Name"
            name={`variantName${index}`}
            value={variant.name}
            onChange={(e) => handleVariantChange(e, index)}
          />
          <Input
            placeholder="Variant Value"
            name={`variantValue${index}`}
            value={variant.value}
            onChange={(e) => handleVariantChange(e, index)}
          />
          <Button type="primary" danger onClick={() => removeVariant(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="primary" onClick={addVariant}>
        Add Variant
      </Button>
    </div>
  );
};

export default ProductVariants;
