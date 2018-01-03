/* eslint-disable no-undef,new-cap,no-tabs */
let shaderGlitch = `
  #define AMPLITUDE 0.1
  #define SPEED 5.0
  uniform sampler2D uSampler;

vec4 rgbShift( in vec2 p , in vec4 shift) {
    shift *= 2.0*shift.w - 1.0;
    vec2 rs = vec2(shift.x,-shift.y);
    vec2 gs = vec2(shift.y,-shift.z);
    vec2 bs = vec2(shift.z,-shift.x);
    
    float r = texture(uSampler, p+rs, 0.0).x;
    float g = texture(uSampler, p+gs, 0.0).y;
    float b = texture(uSampler, p+bs, 0.0).z;
    
    return vec4(r,g,b,1.0);
}

vec4 noise( in vec2 p ) {
    return texture(iChannel1, p, 0.0);
}

vec4 vec4pow( in vec4 v, in float p ) {
    // Don't touch alpha (w), we use it to choose the direction of the shift
    // and we don't want it to go in one direction more often than the other
    return vec4(pow(v.x,p),pow(v.y,p),pow(v.z,p),v.w); 
}

void main( out vec4 gl_fragColor, in vec2 gl_fragCoord )
{
	vec2 p = gl_fragCoord.xy / resolution.xy;
    vec4 c = vec4(0.0,0.0,0.0,1.0);
    
    // Elevating shift values to some high power (between 8 and 16 looks good)
    // helps make the stuttering look more sudden
    vec4 shift = vec4pow(noise(vec2(SPEED*iTime,2.0*SPEED*iTime/25.0 )),8.0)
    *vec4(AMPLITUDE,AMPLITUDE,AMPLITUDE,1.0);;
    
    c += rgbShift(p, shift);
    
	gl_fragColor = c;
}
`

function create (texture) {
  let _texture = texture
  let sprite = new PIXI.Sprite.fromImage(_texture)
  return sprite
}

const Slide = ({texture}) => ({
  sprite: create(texture),
  shader: null,
  addShader: function (shaderCode, uniforms) {
    this.shader = new PIXI.filters.BlurFilter()
    this.sprite.filters = [this.shader]
    return this
  }
})

export default Slide
