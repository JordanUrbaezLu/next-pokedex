import Button from '@/components/Button';
import AuthButton from './AuthButton';

/**
 * @description
 * The Navigation Bar displayed on every page
 */

const Navigation = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex gap-1 pl-75 translate-x-75 pt-4 mt-4">
        <Button href="/" name="Home" data-test-id="Home" />
        <Button href="/generation" name="Generations" />
        <Button href="/search" name="Search" />
        <Button href="/account" name="Account" />
        <Button href="/signup" name="Signup" />
        <Button href="/friends" name="Friends" />
      </div>
      <div className="mr-10">
        <AuthButton />
      </div>
    </div>
  );
};

export default Navigation;
