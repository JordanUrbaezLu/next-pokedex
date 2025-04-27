import Button from '@/components/Button';
import AuthButton from './AuthButton';

/**
 * @description
 * The Navigation Bar displayed on every page
 */

const Navigation = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex gap-1">
        <Button href="/" name="Home" data-test-id="Home" />
        <Button href="/generation" name="Generations" />
        <Button href="/search" name="Search" />
        <Button href="/account" name="Account" />
        <Button href="/signup" name="Signup" />
      </div>
      <div className="mr-10">
        <AuthButton />
      </div>
    </div>
  );
};

export default Navigation;
