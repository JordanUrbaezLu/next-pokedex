import Button from '@/components/Button';

/**
 * @description
 * The Navigation Bar displayed on every page
 */

const Navigation = () => {
  return (
    <div className="flex gap-1">
      <Button href="/" name="Home" data-test-id="Home" />
      <Button href="/generation" name="Generations" />
      <Button href="/search" name="Search" />
      <Button href="/account" name="Account" />
      <Button href="/login" name="Login" />
    </div>
  );
};

export default Navigation;
