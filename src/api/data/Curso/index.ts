import api from "api";
import { ICurso } from "interfaces/Curso.interface"

class CursoData {
  index() {
    return api.get<ICurso[]>('cursos');
  }
  show(id: number) {
    return api.get<ICurso>(`cursos/${id}`);
  }
  store(data: ICurso) {
    return api.post<ICurso>(`cursos`, data);
  }
  update(id: number, data: ICurso) {
    return api.put<ICurso>(`cursos/${id}`, data);
  }
  delete(id: number) {
    return api.delete<ICurso>(`cursos/${id}`);
  }
}

export default new CursoData();
