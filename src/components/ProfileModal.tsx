import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { toggleModal } from '@/store/slices/modalSlice';

const ProfileModal = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Profile Details</h2>
        <p><strong>Name:</strong> {authUser?.profile.firstName}</p>
        {/* <p><strong>Email:</strong> {authUser?.profile.email}</p> */}
        {/* Add more user details here */}
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => alert('Edit User Data')}
        >
          Edit
        </button>
        <button 
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
