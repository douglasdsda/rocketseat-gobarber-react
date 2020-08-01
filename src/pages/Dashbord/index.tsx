import React, { useCallback } from 'react';

// import { Container } from './styles';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';

const Dashbord: React.FC = () => {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handlerLogout = useCallback(async () => {
    try {
      await signOut();

      history.push('/');

      addToast({
        type: 'success',
        title: 'Deslogado com sucesso',
        description: 'Você voi deslogado com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao Deslogar',
        description: 'Ocorreu um erro ao fazer um Logouf.',
      });
    }
  }, [signOut, history, addToast]);

  return (
    <>
      <h1>Dashbord</h1>

      <Button name="deslogar" onClick={handlerLogout} type="button">
        Deslogar
      </Button>
    </>
  );
};

export default Dashbord;
