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
  direction: "column" | "row";
  fontSize: "medium" | "small";
}

function Product({
  product,
  showReview,
  imageRatio,
  direction,
  fontSize,
}: Props) {
  const {
    imageUrl1X1,
    originPrice,
    price,
    productName,
    viewCount,
    imageUrl5X2,
    reviewRating,
  } = product;
  const discountRate = calculateDiscountRate({ originPrice, price });
  const showViewCount = viewCount >= minViewCountToShow;
  const imageUrl =
    imageRatio === "1 / 1" ? imageUrl1X1 : imageUrl5X2;

  return (
    <Flex direction={direction}>
      <Position type="relative">
        <Img aspectRatio={imageRatio} src={imageUrl} />
        <Position
          type="absoulte"
          right={direction === "column" ? 12 : 8}
          bottom={direction === "column" ? 12 : 8}
        >
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <Txt
          fontSize={fontSize === "medium" ? "17px" : "14px"}
        >{`${discountRate}%`}</Txt>
        <Txt
          fontSize={fontSize === "medium" ? "17px" : "14px"}
        >{`${price.toLocaleString()}원`}</Txt>
      </Flex>
      <Txt
        fontSize={fontSize === "medium" ? "15px" : "13px"}
        ellipsisAfterLines={1}
      >
        {productName}
      </Txt>
      {showReview === true && <StarRating rating={reviewRating} />}
      {showViewCount === true
        <Txt
          fontSize={fontSize === "medium" ? "14px" : "12px"}
        >{`${viewCount.toLocaleString()}명 구경함`}</Txt>
      }
    </Flex>
  );
}
