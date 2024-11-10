import { useState } from 'react';

function Variables2(){

  const [llantasParte1, setLlantasParte1] = useState(
    Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false, observacion: '' }).map((_, index) => ({
      id: index + 1,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false,
      observacion: '',
    }))
  );

  const [observacionGeneralParte1, setObservacionGeneralParte1] = useState('');

  const [llantasParte2, setLlantasParte2] = useState(
    Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false, observacion: '' }).map((_, index) => ({
      id: index + 6,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false,
      observacion: '',
    }))
  );

  const [observacionGeneralParte2, setObservacionGeneralParte2] = useState('');

  return {
    llantasParte1, setLlantasParte1, observacionGeneralParte1, setObservacionGeneralParte1,
    llantasParte2, setLlantasParte2, observacionGeneralParte2, setObservacionGeneralParte2,
  };
};

export default Variables2;
