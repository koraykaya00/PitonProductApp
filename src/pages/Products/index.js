import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Grid, GridItem, Stack, Button } from '@chakra-ui/react';
import { getProducts } from '../../services/product.service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Products() {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProductsList() {
      const products = await getProducts(token);
      setProducts(products);
      setLoading(false);
    }
    if (!token) navigate('/');
    getProductsList();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          {' '}
          <br />
          <Stack direction='row' spacing={4}>
            <Button isLoading loadingText='Loading...' colorScheme='purple' variant='outline'>
              Loading...
            </Button>
          </Stack>{' '}
        </div>
      ) : (
        <Grid templateColumns='repeat(4, 1fr)' gap={3}>
          {products.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Products;
