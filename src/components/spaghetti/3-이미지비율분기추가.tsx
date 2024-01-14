interface Props {
  product: {
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
}

function Product({ product, showReview, imageRatio, direction }: Props) {
  const {
    imageUrl1X1,
    originPrice,
    price,
    productName,
    viewCount,
    reviewRating,
    imageUrl5X2,
  } = product;
  const discountRate = calculateDiscountRate({ originPrice, price });
  const showViewCount = viewCount >= minViewCountToShow;
  const imageUrl = imageRatio === "1 / 1" ? imageUrl1X1 : imageUrl5X2;

  return (
    <Flex direction="direction">
      <Position type="relative">
        <Img aspectRatio={imageRatio} src={imageUrl} />
        <Position type="absoulte" right={12} bottom={12}>
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <Txt>{`${discountRate}%`}</Txt>
        <Txt>{`${price.toLocaleString()}원`}</Txt>
      </Flex>
      <Txt ellipsisAfterLines={2}>{productName}</Txt>
      {showReview === true && <StarRating rating={reviewRating} />}
      {showViewCount === true && (
        <Txt>{`${viewCount.toLocaleString()}명 구경함`}</Txt>
      )}
    </Flex>
  );
}
