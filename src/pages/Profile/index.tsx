import React, { ChangeEvent, useCallback, useRef } from 'react';

import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErros from '../../Utils/getValidationErros';
import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Senha é obrigatória'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Confimação de senha é obrigatória'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), undefined],
              'Senha e confirmação precisam ser iguais.',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formDate = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formDate);

        updateUser(response.data);

        history.push('/dashbord');

        addToast({
          type: 'success',
          title: 'Perfil Atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);

          formRef.current?.setErrors(erros);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no Perfil',
          description: 'Ocorreu um erro ao atualizar o perfil, tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        api
          .patch('/users/avatar', data)
          .then(response => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Erro ao atualizar a foto do perfil.',
            });
          });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashbord">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input
                onChange={handleAvatarChange}
                type="file"
                id="avatar"
                name="avatar"
              />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar Senha"
          />

          <Button name="submit" type="submit">
            Confirmar Mudanças
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
