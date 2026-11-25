/* =========================================================
   CodeAndes · pruebas.js
   Datos para revisar cada reto.
   - casos: [{ entrada: 'datos que se escriben', esperado: ['lo que debe aparecer en la salida, en orden'], no: ['lo que NO debe aparecer'] }]
     Los números se comparan por valor (2 = 2.00). Los textos sin importar mayúsculas ni tildes.
   - sinError: true   → basta con que el programa corra sin errores.
   - minLineas: n     → la salida debe tener al menos n líneas.
   - dfd: true        → el reto se hace en DFD; se revisa escribiendo el resultado.
   - null             → no se puede revisar automáticamente: el estudiante marca "Ya lo hice".
   ========================================================= */
window.PRUEBAS = {
  /* Etapa 1 */
  e1l1: { casos: [{ entrada: '', esperado: ['Hello world'] }] },
  e1l2: null,
  e1l3: { dfd: true, casos: [{ entrada: '10', esperado: ['11.5'] }] },
  e1l4: { minLineas: 3 },
  e1l5: { sinError: true },
  e1l6: { casos: [{ entrada: '2.50 4', esperado: ['10'] }, { entrada: '1.25 3', esperado: ['3.75'] }] },
  e1l7: { casos: [{ entrada: '18 15 16', esperado: ['16.33'] }, { entrada: '20 19 19', esperado: ['19.33'] }] },
  e1l8: { casos: [{ entrada: '135', esperado: ['2', '15'] }, { entrada: '61', esperado: ['1', '1'] }] },
  e1l11: { casos: [{ entrada: '3 4', esperado: ['5'] }, { entrada: '6 8', esperado: ['10'] }] },
  e1l9: { casos: [{ entrada: '20', esperado: ['1'] }, { entrada: '15', esperado: ['0'] }] },
  e1l10: { sinError: true },

  /* Etapa 2 */
  e2l1: { casos: [{ entrada: '8', esperado: ['abrigate'] }, { entrada: '15', esperado: [], no: ['abrigate'] }] },
  e2l2: { casos: [{ entrada: '80', esperado: ['7.2'] }, { entrada: '150', esperado: ['18'] }] },
  e2l3: { casos: [{ entrada: '6 3 1', esperado: ['9'] }, { entrada: '6 3 2', esperado: ['3'] }, { entrada: '6 3 3', esperado: ['18'] }] },
  e2l4: { casos: [{ entrada: '7', esperado: ['7', '14', '21', '84'] }] },
  e2l5: { casos: [{ entrada: '2.50 1.25 0', esperado: ['3.75'] }] },
  e2l6: { casos: [{ entrada: '2 18 16 0', esperado: ['17'] }] },
  e2l7: { casos: [{ entrada: '18 12 15 9 20', esperado: ['3', '2', '14.8'] }] },
  e2l15: null,
  e2l8: { casos: [{ entrada: '1.5 2 0.75 3.25 1', esperado: ['1.5', '2', '0.75', '3.25', '1'] }] },
  e2l9: { casos: [{ entrada: '14 18 9 20 12 15', esperado: ['20', '9', '14.67'] }] },
  e2l10: { casos: [{ entrada: '15 16 17 10 12 14 20 18 19', esperado: ['16', '12', '19'] }] },
  e2l11: { casos: [{ entrada: 'Ana Ambato', esperado: ['Ana', 'Ambato'] }] },
  e2l12: { casos: [{ entrada: 'admin espe123', esperado: ['Bienvenido', '5'] }, { entrada: 'pepe 123', esperado: ['incorrectos', '4'], no: ['bienvenido'] }] },
  e2l13: { casos: [{ entrada: '7 5', esperado: ['12'] }] },
  e2l14: { casos: [{ entrada: '-5', esperado: ['no valida'] }, { entrada: '30', esperado: ['30'], no: ['no valida'] }] },

  /* Etapa 3 */
  e3l1: { casos: [{ entrada: '', esperado: ['====', 'MI TIENDA', '===='] }] },
  e3l2: { casos: [{ entrada: '18 15 16', esperado: ['16.33'] }] },
  e3l3: { casos: [{ entrada: '2.5 4', esperado: ['10'] }] },
  e3l4: { casos: [{ entrada: '', esperado: ['3'] }] },
  e3l5: { casos: [{ entrada: '', esperado: ['22.5'] }] },
  e3l6: { casos: [{ entrada: '1234', esperado: ['10'] }, { entrada: '9075', esperado: ['21'] }] },
  e3l7: { casos: [{ entrada: '', esperado: ['0', '1', '1', '2', '3', '5', '8', '13', '21', '34'] }] },

  /* Etapa 4 */
  e4l1: { casos: [{ entrada: '2.5 4', esperado: ['10'] }] },
  e4l2: { casos: [{ entrada: 'Ximena Paz', esperado: ['10', 'X'] }] },
  e4l3: { casos: [{ entrada: 'arroz 1.25 10 leche 1.10 5 pan 0.15 100', esperado: ['arroz', '1.25'] }] },
  e4l4: { casos: [{ entrada: 'Ana Luis Sofia', esperado: ['Ana', 'Luis', 'Sofia'] }] },
  e4l5: { casos: [{ entrada: '15 18 9 20 12', esperado: ['20', '18', '15', '12', '9'] }] },
  e4l6: { casos: [{ entrada: '135', esperado: ['4'] }, { entrada: '999', esperado: ['No existe'] }] },

  /* Etapa 5 */
  e5l1: { casos: [{ entrada: '', esperado: ['8', '3'] }] },
  e5l2: { casos: [{ entrada: '3 1.5 2 3.25', esperado: ['6.75'] }] },
  e5l3: { casos: [{ entrada: '', esperado: ['17', '14'] }] },
  e5l4: { casos: [{ entrada: '', esperado: ['3.3', 'leche'] }] },
  e5l5: { casos: [{ entrada: '', esperado: ['1150'] }] },
  e5l6: { casos: [{ entrada: '', esperado: ['12', '12.56'] }] },
  e5l7: { casos: [{ entrada: '18 15 20 -1', esperado: ['3', '17.67'] }] },
  e5l8: { casos: [{ entrada: 'leche', esperado: ['1.1'] }, { entrada: 'cola', esperado: ['No existe'] }] },
  e5l9: { casos: [{ entrada: '', esperado: ['3', '7', '1.5', '2.25', 'Quito', 'Cuenca'] }] },

  /* Etapa 6 */
  e6l1: { casos: [{ entrada: '100', esperado: ['10000'] }] },
  e6l2: { casos: [{ entrada: 'casa', esperado: ['asac'] }] },
  e6l3: { casos: [{ entrada: 'Ana Luis Sofia Pedro', esperado: ['Ana', 'Luis', 'Sofia', 'Pedro'] }] },
  e6l4: { casos: [{ entrada: '', esperado: ['30', '20', '10', '3'] }] },
  e6l5: { casos: [{ entrada: '1 2 3 4 5 3', esperado: ['si'] }] },
  e6l6: { casos: [{ entrada: '', esperado: ['20', '30', '40', '50', '60', '70', '80'] }] },

  /* Etapa 7 */
  e7l1: { casos: [{ entrada: '', esperado: ['Arroz', 'Leche', 'Pan'] }] },
  e7l2: { casos: [{ entrada: '2 2 3 0', esperado: ['3.30', '3.80'] }] },
  e7l3: { casos: [{ entrada: '2 2 3 0', esperado: ['3.30', '3.80'] }] },
  e7l4: null
};
