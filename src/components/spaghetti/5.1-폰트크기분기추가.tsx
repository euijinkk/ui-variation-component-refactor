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
  size: "medium" | "small";
}

function Product({ product, showReview, imageRatio, direction, size }: Props) {
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
      <Flex direction="row">
        <Txt
          fontSize={size === "medium" ? "17px" : "14px"}
        >{`${discountRate}%`}</Txt>
        <Txt
          fontSize={size === "medium" ? "17px" : "14px"}
        >{`${price.toLocaleString()}원`}</Txt>
      </Flex>
      <Txt
        fontSize={size === "medium" ? "15px" : "13px"}
        ellipsisAfterLines={size === "medium" ? "2" : "1"}
      >
        {productName}
      </Txt>
      {showReview === true && <StarRating rating={reviewRating} />}
      {showViewCount === true && (
        <Txt
          fontSize={size === "medium" ? "14px" : "12px"}
        >{`${viewCount.toLocaleString()}명 구경함`}</Txt>
      )}
    </Flex>
  );
}

Product.Image = Image;
Product.WishButton = WishButton;
Product.DiscountRate = DiscountRate;
Product.Price = Price;
Product.ProductName = ProductName;
Product.Review = Review;
Product.ViewCount = ViewCount;
