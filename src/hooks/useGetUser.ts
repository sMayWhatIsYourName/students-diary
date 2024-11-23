interface IUserStore {
  username: string | null;
}

export const useGetUser = () => {
  const username = localStorage.getItem('username');


  return {
    username
  };
};