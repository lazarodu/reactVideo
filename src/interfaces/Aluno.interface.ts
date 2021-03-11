export interface IAluno {
  id: number;
  curso_id?: number;
  curso?: {
    id: number;
    nome: string;
  }
  nome: string;
  descricao: string;
}
