import React from 'react';
import ratingStyle from './rating.module.scss';
import RatingButton from '../../ui/svgButton/svgButton.js';
import ratingIcon from '../../ui/icons/star.svg'

const Rating = (props) => {

  const [isRating, setIsRating] = React.useState('0');

  const handleClickRating = (evt) => {
    if (evt.target.hasAttribute('data-item-value')) {
      setIsRating(evt.target.dataset.itemValue);
      // пропс передающий наружу цифру 1-5 если оценка произведена
      props.actualRating(Number(evt.target.dataset.itemValue));
    }
  }

  return (
    <div className={`${ratingStyle['rating']}`}>
      <p className={`${ratingStyle['rating__title']}`}>{props.isAssessment ? props.titleСlosing : props.titleOpening}</p>
{props.isAssessment ? '' :
      <div className={`${ratingStyle['rating__icon-box']}`} data-total-value={isRating}>
        <RatingButton
          svgHref={ratingIcon}
          svgId='#star'
          viewBox='0 0 48 48'
          elementStyle={ratingStyle}
          elementType='rating'
          destiny='price'
          onClick={handleClickRating}
          dataItemValue='5' />
        <RatingButton
          svgHref={ratingIcon}
          svgId='#star'
          viewBox='0 0 48 48'
          elementStyle={ratingStyle}
          elementType='rating'
          destiny='price'
          onClick={handleClickRating}
          dataItemValue='4' />
        <RatingButton
          svgHref={ratingIcon}
          svgId='#star'
          viewBox='0 0 48 48'
          elementStyle={ratingStyle}
          elementType='rating'
          destiny='price'
          onClick={handleClickRating}
          dataItemValue='3' />
        <RatingButton
          svgHref={ratingIcon}
          svgId='#star'
          viewBox='0 0 48 48'
          elementStyle={ratingStyle}
          elementType='rating'
          destiny='price'
          onClick={handleClickRating}
          dataItemValue='2' />
        <RatingButton
          svgHref={ratingIcon}
          svgId='#star'
          viewBox='0 0 48 48'
          elementStyle={ratingStyle}
          elementType='rating'
          destiny='price'
          onClick={handleClickRating}
          dataItemValue='1' />
      </div>
}
    </div>
  );
};

export default Rating;