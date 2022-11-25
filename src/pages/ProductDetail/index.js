import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/product.service';

function ProductDetail() {
  const token = useSelector((state) => state.user.token);
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState('');

  useEffect(() => {
    async function getOneProduct() {
      const product = await getProduct(token, productId);
      setProduct(product);
      setLoading(false);
    }
    getOneProduct();
  }, []);

  return (
    <div>
      ProductDetail
      {product && JSON.stringify(product)}
    </div>
  );
}

export default ProductDetail;
