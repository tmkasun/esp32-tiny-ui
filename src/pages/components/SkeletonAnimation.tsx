export interface ISkeletonAnimation {
  isLoading: boolean;
  children: React.ReactNode;
  width?: string;
}
export const SkeletonAnimation = (props: ISkeletonAnimation) => {
  const { isLoading, children, width = "w-12" } = props;
  return isLoading ? (
    <div className="animate-pulse bg-gray-400 h-6 w-12 rounded"></div>
  ) : (
    <>{children}</>
  );
};
export default SkeletonAnimation;
