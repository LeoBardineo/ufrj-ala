precision lowp float;

varying vec4 v_normal;

void main() {
  vec3 corDoObjeto = vec3(0.75, 0.75, 0.75);

  // Ambiente
  vec3 corAmbiente = vec3(0.5, 0.5, 0.5);
  vec3 ambiente = corAmbiente;

  // Difusa
  vec3 normal = normalize(v_normal.xyz);
  vec3 corDaLuz = vec3(1.0, 1.0, 1.0);
  vec3 posicaoDaLuz = vec3(1.0, 1.0, 1.0);
  float cosseno = max(0.0, dot(posicaoDaLuz, normal));
  vec3 difusa = cosseno * corDaLuz;

  // Especular
  float brilho = 256.0;
  vec3 posicaoDaCamera = normalize(vec3(0.0, 0.0, 1.0));
  vec3 posicaoDaReflexao = normalize(reflect(-posicaoDaLuz, normal));
  float resultadoEspecular = max(0.0, dot(posicaoDaCamera, posicaoDaReflexao));
  resultadoEspecular = pow(resultadoEspecular, brilho);
  vec3 especular = resultadoEspecular * corDaLuz;

  // Phong
  vec3 phong = vec3(0.0, 0.0, 0.0);
  float intensidadeAmbiente = 0.2;
  float intensidadeDifusa = 0.5;
  float intensidadeEspecular = 0.5;
  phong = ambiente * intensidadeAmbiente + difusa * intensidadeDifusa + especular * intensidadeEspecular;

  vec3 color = corDoObjeto * phong;

  gl_FragColor = vec4(color, 1.0);
}