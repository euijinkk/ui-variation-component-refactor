interface Props {
  product: {
    originPrice: number;
    price: number;
    productName: string;
    viewCount: number;
    imageUrl1X1: string;
  };
}

function Product({ product }: Props) {
  const { imageUrl1X1, originPrice, price, productName, viewCount } = product;
  const discountRate = calculateDiscountRate({ originPrice, price });
  const showViewCount = viewCount >= MIN_VIEW_COUNT_TO_SHOW;

  return (
    <Flex direction="column">
      <Position type="relative">
        <Img aspectRatio="1 / 1" src={imageUrl1X1} />
        <Position type="absoulte" right={12} bottom={12}>
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <Txt>{`${discountRate}%`}</Txt>
        <Txt>{`${price.toLocaleString()}원`}</Txt>
      </Flex>
      <Txt ellipsisAfterLines={2}>{productName}</Txt>
      {showViewCount === true && (
        <Txt>{`${viewCount.toLocaleString()}명 구경함`}</Txt>
      )}
    </Flex>
  );
}
