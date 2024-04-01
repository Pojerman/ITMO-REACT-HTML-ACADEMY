type ShowMoreBtnProps = {
  onBtnClick: () => void;
}
export default function ShowMoreBtn({onBtnClick}: ShowMoreBtnProps) {
  return(
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onBtnClick}>
          Show more
      </button>
    </div>
  );
}
