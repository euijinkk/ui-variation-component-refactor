import { createContext } from "react";

interface ProductType {
  isWished: boolean;
  productId: number;
  originPrice: number;
  price: number;
  productName: string;
  viewCount: number;
  imageUrl1X1: string;
  reviewRating: number;
  imageUrl5X2: string;
}

interface Props {
  product: ProductType;
  showReview: boolean;
  imageRatio: "5 / 2" | "1 / 1";
  direction: "column" | "row";
  fontSize: "medium" | "small";
}

function MediumColumnProduct({ product }: Props) {
  return (
    <Flex direction={"column"}>
      <Position type="relative">
        <ProductImage imageRatio={"1 / 1"} />
        <Img src={imageUrl} />
        <Position type="absoulte" right={12} bottom={12}>
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <DiscountRate fontSize={"medium"} />
        <Price fontSize={"medium"} />
      </Flex>
      <ProductName fontSize={"medium"} ellipsisAfterLines={1} />
      <StarRating rating={reviewRating} />
      <ViewCount fontSize={"medium"} />
    </Flex>
  );
}

function MediumRowProduct() {
  return (
    <Flex direction={"row"}>
      <Position type="relative">
        <ProductImage imageRatio={"1 / 1"} />
        <Img src={imageUrl} />
        <Position type="absoulte" right={8} bottom={8}>
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <DiscountRate fontSize={"medium"} />
        <Price fontSize={"medium"} />
      </Flex>
      <ProductName fontSize={"medium"} ellipsisAfterLines={1} />
      <ViewCount fontSize={"medium"} />
    </Flex>
  );
}

function SmallColumnProduct() {
  return (
    <Flex direction={"column"}>
      <Position type="relative">
        <ProductImage imageRatio={"1 / 1"} />
        <Img src={imageUrl} />
        <Position type="absoulte" right={12} bottom={12}>
          <WishButton />
        </Position>
      </Position>
      <Flex direction="row">
        <DiscountRate fontSize={"small"} />
        <Price fontSize={"small"} />
      </Flex>
      <ProductName fontSize={"small"} ellipsisAfterLines={1} />
      <ViewCount fontSize={"small"} />
    </Flex>
  );
}

// MediumColumnProduct, MediumRowProduct, SmallColumnProduct,
// 취향에 따라서, MediumProductWithReview, MediumProduct5X2 도 나눌 수 있다.

// {showReview === true && <StarRating rating={reviewRating} />}
const ProductContext = createContext<ProductType>({} as ProductType);

function ProductImage() {
  const imageUrl = imageRatio === "1 / 1" ? imageUrl1X1 : imageUrl5X2;

  return <Img src={imageUrl} />;
}

function WishButton() {
  if (isWished === true) {
    return (
      <Icon
        name="heart-red"
        onClick={() => {
          deleteWishList(productId);
        }}
      />
    );
  }
  return (
    <Icon
      name="heart-blank"
      onClick={() => {
        addWishList(productId);
      }}
    />
  );
}

function DiscountRate() {
  return <Txt>{`${discountRate}%`}</Txt>;
}

function Price() {
  return <Txt>{`${price.toLocaleString()}원`}</Txt>;
}

function ProductName() {
  return <Txt ellipsisAfterLines={2}>{productName}</Txt>;
}

function Review() {
  return <StarRating rating={reviewRating} />;
}

function ViewCount() {
  const showViewCount = viewCount >= MIN_VIEW_COUNT_TO_SHOW;
  if (showViewCount !== true) {
    return null;
  }

  return <Txt>{`${viewCount.toLocaleString()}명 구경함`}</Txt>;
}
