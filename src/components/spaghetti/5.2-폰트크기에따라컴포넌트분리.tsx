interface Props {
  product: {
    isWished: boolean;
    productId: number;
    originPrice: number;
    price: number;
    productName: string;
    viewCount: number;
    imageUrl1X1: string;
    reviewRating: number;
    imageUrl5X2: string;
  };
  showReview: boolean;
  imageRatio: "5 / 2" | "1 / 1";
  direction: "column" | "row";
  fontSize: "medium" | "small";
}

function SmallProduct({ product, showReview, imageRatio, direction }: Props) {
  const {
    isWished,
    productId,
    imageUrl1X1,
    originPrice,
    price,
    productName,
    viewCount,
    imageUrl5X2,
    reviewRating,
  } = product;
  const discountRate = calculateDiscountRate({ originPrice, price });
  const showViewCount = viewCount >= MIN_VIEW_COUNT_TO_SHOW;
  const imageUrl = imageRatio === "1 / 1" ? imageUrl1X1 : imageUrl5X2;
  return (
    <Flex direction={direction}>
      <Position type="relative">
        <Img src={imageUrl} />
        <Position
          type="absoulte"
          right={direction === "column" ? 12 : 8}
          bottom={direction === "column" ? 12 : 8}
        >
          {isWished ? (
            <Icon
              name="heart-red"
              onClick={() => {
                deleteWishList(productId);
              }}
            />
          ) : (
            <Icon
              name="heart-blank"
              onClick={() => {
                addWishList(productId);
              }}
            />
          )}
        </Position>
      </Position>
      <Flex direction="column">
        <Txt fontSize={"14px"}>{`${discountRate}%`}</Txt>
        <Txt fontSize={"14px"}>{`${price.toLocaleString()}원`}</Txt>
      </Flex>
      <Txt fontSize={"13px"} ellipsisAfterLines={1}>
        {productName}
      </Txt>
      {showReview === true && <StarRating rating={reviewRating} />}
      {showViewCount === true && (
        <Txt fontSize={"12px"}>{`${viewCount.toLocaleString()}명 구경함`}</Txt>
      )}
    </Flex>
  );
}

function MediumProduct({ product, showReview, imageRatio, direction }: Props) {
  const { imageUrl1X1, originPrice, price, productName, viewCount } = product;
  const discountRate = calculateDiscountRate({ originPrice, price });
  const showViewCount = viewCount >= MIN_VIEW_COUNT_TO_SHOW;
  const imageUrl = imageRatio === "1 / 1" ? imageUrl1X1 : imageUrl5X2;

  return (
    <Flex direction={direction}>
      <Position type="relative">
        <Img src={imageUrl} />
        <Position
          type="absoulte"
          right={direction === "column" ? 12 : 8}
          bottom={direction === "column" ? 12 : 8}
        >
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <Txt fontSize={"17px"}>{`${discountRate}%`}</Txt>
        <Txt fontSize={"17px"}>{`${price.toLocaleString()}원`}</Txt>
      </Flex>
      <Txt fontSize={"15px"} ellipsisAfterLines={1}>
        {productName}
      </Txt>
      {showReview === true && <StarRating rating={reviewRating} />}
      {showViewCount === true && (
        <Txt fontSize={"14px"}>{`${viewCount.toLocaleString()}명 구경함`}</Txt>
      )}
    </Flex>
  );
}
