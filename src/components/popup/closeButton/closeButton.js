const ClossButton = (props)=> {

  return (
    <button type="button" className={`${props.elementStyle[`${props.elementType}__close-button`]} close-button`} id='info-popup-close-button'>
    <svg className={`${props.elementStyle[`${props.elementType}__close-button-icon-box`]} close-button__ico-box`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
      <use className={`${props.elementStyle[`${props.elementType}__close-button-icon`]} close-button__icon`} href={`${props.svgHref}${props.svgId}`} ></use>
    </svg>
  </button>
  );
};

export default ClossButton;