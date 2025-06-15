import React, { useState, useEffect } from 'react';
import './PerfilModal.css';
import { jwtDecode } from "jwt-decode";
import { showSwal } from '../utils/alertasSwal';

interface PerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
}

const PerfilModal: React.FC<PerfilModalProps> = ({ isOpen, onClose }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', dataNascimento: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode<Usuario>(token);
        setUsuario(user);
        setForm({
          nome: user.nome || '',
          email: user.email || '',
          senha: user.senha || '',
          dataNascimento: user.dataNascimento ? user.dataNascimento.substring(0, 10) : ''
        });
      } catch {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  if (!usuario) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="fechar" onClick={onClose}>X</button>
          <h2>Usuário não encontrado</h2>
          <p>Faça login para acessar seu perfil.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const token = localStorage.getItem('token');
  const handleSalvar = async () => {
    // Validação do nome
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]{3,20}$/;
    if (!nomeRegex.test(form.nome)) {
      showSwal({
        icon: 'warning',
        title: 'Nome inválido',
        text: 'O nome deve ter entre 3 e 20 letras e conter apenas letras e espaços.'
      });
      return;
    }
    // Validação da data de nascimento
    const hoje = new Date();
    const dataNasc = new Date(form.dataNascimento);
    if (!form.dataNascimento || dataNasc > hoje) {
      showSwal({
        icon: 'warning',
        title: 'Data de nascimento inválida',
        text: 'A data de nascimento não pode ser futura.'
      });
      return;
    }
    // Validação de senha forte
    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!senhaForteRegex.test(form.senha)) {
      showSwal({
        icon: 'warning',
        title: 'Senha fraca',
        text: 'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
      });
      return;
    }
    // Validação de email
    if (!form.email) {
      showSwal({
        icon: 'warning',
        title: 'E-mail obrigatório',
        text: 'O campo de e-mail não pode estar vazio.'
      });
      return;
    }
    if (!form.email.includes('@')) {
      showSwal({
        icon: 'warning',
        title: 'E-mail inválido',
        text: 'O e-mail deve conter o caractere @.'
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showSwal({
        icon: 'warning',
        title: 'E-mail inválido',
        text: 'Digite um e-mail válido no formato: exemplo@dominio.com.'
      });
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/usuarios/update/${usuario.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (response.status === 401) {
        showSwal({ icon: 'warning', title: 'Sessão expirada', text: 'Faça login novamente.' });
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      if (response.ok) {
        const atualizado = { ...usuario, ...form };
        setUsuario(atualizado);
        setEditando(false);
        showSwal({ icon: 'success', title: 'Sucesso', text: 'Dados atualizados com sucesso!' });
      } else {
        showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao atualizar dados.' });
      }
    } catch (err) {
      showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao conectar com o servidor.' });
    }
  };

  const handleExcluir = async () => {
    const Swal = (await import('sweetalert2')).default;
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Excluir conta?',
      text: 'Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm',
        icon: 'swal-custom-icon',
      },
    });
    if (!confirm.isConfirmed) return;
    try {
      const response = await fetch(`http://localhost:3001/usuarios/delete/${usuario.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 401) {
        showSwal({ icon: 'warning', title: 'Sessão expirada', text: 'Faça login novamente.' });
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      if (response.ok) {
        localStorage.removeItem('token');
        showSwal({ icon: 'success', title: 'Conta excluída', text: 'Conta excluída com sucesso!' });
        window.location.href = '/';
      } else {
        showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao excluir conta.' });
      }
    } catch (err) {
      showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao conectar com o servidor.' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="fechar" onClick={onClose}>X</button>
        <h2>Meu Perfil</h2>
        <form className="perfil-form" onSubmit={e => e.preventDefault()}>
          <label>Nome:</label>
            <input name="nome" value={form.nome} onChange={handleChange} disabled={!editando} />
          <label>Email:</label>
            <input name="email" value={form.email} onChange={handleChange} disabled={!editando} />
          <label>Senha:</label>
            <input name="senha" type="password" value={form.senha} onChange={handleChange} disabled={!editando} />
          <label>Data de Nascimento:</label>
            <input name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} disabled={!editando} max={new Date().toISOString().split('T')[0]} />
          <div className="botoes">
            {!editando ? (
              <button type="button" onClick={handleEditar}>Editar</button>
            ) : (
              <button type="button" onClick={handleSalvar}>Salvar</button>
            )}
            <button type="button" onClick={handleExcluir} className="excluir">Excluir Conta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilModal;
