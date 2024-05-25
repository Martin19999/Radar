import { renderHook } from '@testing-library/react';
import { useEasyToast } from '../../../components/toast';
import { useToast } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn()
}));

describe('useEasyToast', () => {
  let mockToast: jest.Mock<any, any, any>;
  beforeEach(() => {
    mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  it('calls showSuccess with correct parameters', () => {
    const { result } = renderHook(() => useEasyToast());
    result.current.showSuccess('Operation successful');

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Operation successful',
      status: 'success',
      duration: 1300,
      isClosable: true,
    });
  });

  it('calls showError with correct parameters, parsing Firebase error codes', () => {
    const { result } = renderHook(() => useEasyToast());
    result.current.showError('An error occurred (auth/user-not-found)');

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Sorry, user not found',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  });

  it('calls showErrorNonFirebase with correct parameters', () => {
    const { result } = renderHook(() => useEasyToast());
    result.current.showErrorNonFirebase('An internal error occurred');

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'An internal error occurred',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  });
});
