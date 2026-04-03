import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/slices/cartSlice'

function Productlistitems({ product, single }) {

  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      quantity: 1,
      maxQty: product.qty,
      price: product.price,
      image: product.image
    }));
  };

  if (single) {
    return (
      <div className='col-md-10 mx-auto mb-2'>
        <div className='card mb-3'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img
                src={product?.image}
                alt={product?.name}
                className='img-fluid rounded h-100'
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h2 className='card-title'>{product?.name}</h2>
                <p className='card-text text-muted'>{product?.description}</p>
                <h3 className='text-danger'>${product?.price}</h3>
                <button
                  onClick={handleAddToCart}
                  className='btn btn-primary'>
                  <i className='fas fa-cart-plus me-1'></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='col-md-4 mb-2'>
      <Link to={`/products/${product._id}`} className="text-decoration-none text-dark">
        <div className='card shadow-sm'>
          <img
            src={product?.image}
            alt={product?.name}
            className='card-img-top'
            style={{ height: '160px', objectFit: 'cover' }}
            onError={(e) => e.target.src = "https://via.placeholder.com/150"}
          />
          <div className="card-body">
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <h5 className="card-title mb-0">{product?.name}</h5>
              <h5 className="text-danger mb-0">${product?.price}</h5>
            </div>
            <p className="card-text text-muted">{product?.description}</p>
            <button
              onClick={handleAddToCart}
              className='btn btn-sm btn-primary w-100'>
              <i className='fas fa-cart-plus me-1'></i>
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Productlistitems