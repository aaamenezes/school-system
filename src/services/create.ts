import fs from 'fs';
import allData from '../../db.json';

export default function createEntity(body: any) {
  const { name, age } = body;
  const newData = {
    ...allData,
    students: [...allData.students, { name, age }]
  };

  fs.writeFile('db.json', JSON.stringify(newData, null, 2), error => {
    if (error) throw new Error('Erro ao salvar novo estudante');
    console.log(`Estudante ${name} criado com sucesso!`);
  });

  /**
   * Criar Class
   * {NUMBER} + {LETTER} - {SHIFT}
   */
}
