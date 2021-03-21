import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactonModal: () => void;
}

export function Header({ onOpenNewTransactonModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt=""/>    
        <button type="button" onClick={onOpenNewTransactonModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}