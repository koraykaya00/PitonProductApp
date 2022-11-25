import { Box, Image, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { useState } from 'react';
import '../styles.module.css';
import { likeProduct, unlikeProduct } from '../../services/product.service';
import { useSelector } from 'react-redux';
function Card({ product }) {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [likes, setLikes] = useState(product.likes === 1);
  const onProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const onLikeButtonClick = async () => {
    try {
      if (likes) {
        await unlikeProduct(token, product.id);
        setLikes(false);
      } else {
        await likeProduct(token, product.id);
        setLikes(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };
  return (
    <Box borderWidth='2px' borderRadius='lg' overflow='hidden' p='4' onClick={onProductClick}>
      <Image
        onClick={onProductClick}
        style={{ cursor: 'pointer' }}
        src={`https://assignment-api.piton.com.tr${product.image}`}
        alt='product'
      />

      <Box>
        <Box d='plex' alignItems='baseline'></Box>
        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
          {product.name}
        </Box>
        <Box>${product.price}</Box>
      </Box>
      <ButtonGroup size='sm' isAttached variant='outline' colorScheme='purple'>
        <Button>Add To Basket</Button>
        <IconButton aria-label='Add to friends' icon={<AddIcon />} />
        <IconButton
          className={'like-button ' + (likes ? 'liked' : '')}
          onClick={onLikeButtonClick}
          aria-label='Add to like'
          icon={<BsHeartFill />}
          style={{ marginLeft: '20px' }}
        >
          {' '}
        </IconButton>{' '}
        <style>{`
          .like-button {
              font-size: 1rem;
              padding: 5px 10px;
              color:  #585858;
          }
          .liked {
              font-weight: bold;
              color: purple;
            }
        `}</style>
      </ButtonGroup>
    </Box>
  );
}

export default Card;
