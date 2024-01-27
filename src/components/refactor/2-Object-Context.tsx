import { PropsWithChildren, createContext, useContext } from "react";

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

function MediumColumnProduct({ product }: { product: ProductType }) {
  return (
    <ProductContainer product={product}>
      <Flex direction={"column"}>
        <Position type="relative">
          <ProductContainer.Image imageRatio={"1 / 1"} />
          <Position type="absoulte" right={12} bottom={12}>
            <ProductContainer.WishButton />
          </Position>
        </Position>
        <Flex direction="row">
          <ProductContainer.DiscountRate fontSize={"medium"} />
          <ProductContainer.Price fontSize={"medium"} />
        </Flex>
        <ProductContainer.ProductName
          fontSize={"medium"}
          ellipsisAfterLines={2}
        />
        <ProductContainer.ViewCount fontSize={"medium"} />
      </Flex>
    </ProductContainer>
  );
}

function MediumRowProduct({ product }: { product: ProductType }) {
  return (
    <ProductContainer product={product}>
      <Flex direction={"row"}>
        <Position type="relative">
          <ProductContainer.Image imageRatio={"1 / 1"} />
          <Position type="absoulte" right={8} bottom={8}>
            <ProductContainer.WishButton />
          </Position>
        </Position>
        <Flex direction="row">
          <ProductContainer.DiscountRate fontSize={"medium"} />
          <ProductContainer.Price fontSize={"medium"} />
        </Flex>
        <ProductContainer.ProductName
          fontSize={"medium"}
          ellipsisAfterLines={1}
        />
        <ProductContainer.ViewCount fontSize={"medium"} />
      </Flex>
    </ProductContainer>
  );
}

function SmallColumnProduct({ product }: { product: ProductType }) {
  return (
    <ProductContainer product={product}>
      <Flex direction={"column"}>
        <Position type="relative">
          <ProductContainer.Image imageRatio={"1 / 1"} />
          <Position type="absoulte" right={12} bottom={12}>
            <ProductContainer.WishButton />
          </Position>
        </Position>
        <Flex direction="row">
          <ProductContainer.DiscountRate fontSize={"medium"} />
          <ProductContainer.Price fontSize={"medium"} />
        </Flex>
        <ProductContainer.ProductName
          fontSize={"medium"}
          ellipsisAfterLines={1}
        />
        <ProductContainer.ViewCount fontSize={"medium"} />
      </Flex>
    </ProductContainer>
  );
}

const ProductContext = createContext<ProductType>({} as ProductType);
function useProductConsumer() {
  return useContext(ProductContext);
}

function ProductContainer({
  children,
  product,
}: PropsWithChildren<{ product: ProductType }>) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}
ProductContainer.Image = Image;
ProductContainer.WishButton = WishButton;
ProductContainer.DiscountRate = DiscountRate;
ProductContainer.Price = Price;
ProductContainer.ProductName = ProductName;
ProductContainer.Review = Review;
ProductContainer.ViewCount = ViewCount;

function Image({ imageRatio }: { imageRatio: "1 / 1" | "5 / 2" }) {
  const { imageUrl1X1, imageUrl5X2 } = useProductConsumer();
  const imageUrl = imageRatio === "1 / 1" ? imageUrl1X1 : imageUrl5X2;

  return <Img src={imageUrl} />;
}

function WishButton() {
  const { isWished, productId } = useProductConsumer();
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

function DiscountRate({ fontSize }: { fontSize: "small" | "medium" }) {
  const { originPrice, price } = useProductConsumer();
  const discountRate = calculateDiscountRate({ originPrice, price });

  return (
    <Txt
      fontSize={fontSize === "medium" ? "17px" : "14px"}
    >{`${discountRate}%`}</Txt>
  );
}

function Price({ fontSize }: { fontSize: "small" | "medium" }) {
  const { price } = useProductConsumer();
  return (
    <Txt
      fontSize={fontSize === "medium" ? "17px" : "14px"}
    >{`${price.toLocaleString()}원`}</Txt>
  );
}

function ProductName({
  ellipsisAfterLines,
  fontSize,
}: {
  ellipsisAfterLines: number;
  fontSize: "small" | "medium";
}) {
  const { productName } = useProductConsumer();
  return (
    <Txt
      fontSize={fontSize === "medium" ? "15px" : "13px"}
      ellipsisAfterLines={ellipsisAfterLines}
    >
      {productName}
    </Txt>
  );
}

function Review() {
  const { reviewRating } = useProductConsumer();
  return <StarRating rating={reviewRating} />;
}

function ViewCount({ fontSize }: { fontSize: "small" | "medium" }) {
  const { viewCount } = useProductConsumer();
  const showViewCount = viewCount >= MIN_VIEW_COUNT_TO_SHOW;
  if (showViewCount !== true) {
    return null;
  }

  return (
    <Txt
      fontSize={fontSize === "medium" ? "14px" : "12px"}
    >{`${viewCount.toLocaleString()}명 구경함`}</Txt>
  );
}
