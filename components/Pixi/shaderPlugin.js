/* eslint-disable no-undef */
/*!
 * createShaderPlugin.js - v1.0.1
 * https://github.com/magig/createShaderPlugin
 *
 * createShaderPlugin.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
function createShaderPlugin (name, vertShader, fragShader, uniformDefaults, renderer) {
  console.log('createShaderPlugin')
  var ShaderPlugin = function (_renderer) {
    console.log('riga 12')
    PIXI.ObjectRenderer.call(this, _renderer)
    console.log('_renderer', _renderer)

    if (!vertShader) {
      this.vertShader = [
        '#define GLSLIFY 1',

        'attribute vec2 aVertexPosition;',
        'attribute vec2 aTextureCoord;',

        'uniform mat3 projectionMatrix;',

        'varying vec2 vTextureCoord;',

        'void main(void) {',
        'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
        'vTextureCoord = aTextureCoord;',
        '}'
      ].join('\n')
    } else {
      console.log('riga 33')
      this.vertShader = '#define GLSLIFY 1\n' + vertShader
    }
    console.log('riga 36')
    this.fragShader = '#define GLSLIFY 1\n' + fragShader
    this.uniformDefaults = uniformDefaults
    this._tintAlpha = new Float32Array(4)
  }
  console.log('riga 41')
  ShaderPlugin.prototype = Object.create(PIXI.ObjectRenderer.prototype)
  ShaderPlugin.prototype.constructor = ShaderPlugin

  ShaderPlugin.prototype._initShader = function () {
    console.log('riga 44')
    var gl = this.renderer.gl

    var shader = this.shader = new PIXI.Shader(gl, this.vertShader, this.fragShader)
    if (this.uniformDefaults) {
      shader.bind()
      var uniformDefaults = this.uniformDefaults
      var shaderUniforms = shader.uniforms
      for (var key in uniformDefaults) {
        shaderUniforms[key] = uniformDefaults[key]
      }
    }

    this.quad = new PIXI.Quad(gl)
    this.quad.initVao(shader)
  }

  ShaderPlugin.prototype.onContextChange = function () {
    console.log('onContextChange')
    this._initShader()
  }

  ShaderPlugin.prototype.start = function () {
    console.log('start')
    if (!this.shader) {
      this._initShader()
    }
  }

  ShaderPlugin.prototype.destroy = function () {
    console.log('riga 74')
    PIXI.ObjectRenderer.prototype.destroy.call(this)

    if (this.shader) {
      this.shader.destroy()
      this.shader = null
    }

    if (this.quad) {
      this.quad.destroy()
      this.quad = null
    }
  }

  ShaderPlugin.prototype.render = function (sprite) {
    console.log('riga 91')
    // setup
    var shader = this.shader

    var renderer = this.renderer
    renderer.bindShader(shader)
    renderer.state.setBlendMode(sprite.blendMode)

    var quad = this.quad
    renderer.bindVao(quad.vao)

    // calculate and upload vertices
    var wt = sprite.transform.worldTransform
    var a = wt.a
    var b = wt.b
    var c = wt.c
    var d = wt.d
    var tx = wt.tx
    var ty = wt.ty
    var anchor = sprite._anchor

    var w = sprite.pluginSize.x
    var w1 = -anchor._x * w
    var w0 = w1 + w

    var h = sprite.pluginSize.y
    var h1 = -anchor._y * h
    var h0 = h1 + h

    // xy
    quad.vertices[0] = a * w1 + c * h1 + tx
    quad.vertices[1] = d * h1 + b * w1 + ty

    // xy
    quad.vertices[2] = a * w0 + c * h1 + tx
    quad.vertices[3] = d * h1 + b * w0 + ty

    // xy
    quad.vertices[4] = a * w0 + c * h0 + tx
    quad.vertices[5] = d * h0 + b * w0 + ty

    // xy
    quad.vertices[6] = a * w1 + c * h0 + tx
    quad.vertices[7] = d * h0 + b * w1 + ty

    quad.upload()

    // handle tint and worldAlpha
    var tintAlpha = this._tintAlpha
    PIXI.utils.hex2rgb(sprite.tint, tintAlpha)
    var alpha = sprite.worldAlpha
    tintAlpha[0] *= alpha
    tintAlpha[1] *= alpha
    tintAlpha[2] *= alpha
    tintAlpha[3] = alpha
    shader.uniforms.uTintAlpha = tintAlpha

    // copy uniforms from sprite to shader
    var spriteUniforms = sprite.pluginUniforms
    var shaderUniforms = shader.uniforms
    if (spriteUniforms) {
      for (var key in spriteUniforms) {
        shaderUniforms[key] = spriteUniforms[key]
      }
    }

    // draw
    quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0)
  }

  // register plugin
  console.log('riga 157')
  PIXI.WebGLRenderer.registerPlugin(name, ShaderPlugin)
  console.log('riga 159')
  PIXI.CanvasRenderer.registerPlugin(name, PIXI.CanvasSpriteRenderer)
  console.log('riga 161')

  // update renderer if one was created and passed in by user
  if (renderer) {
    console('if renderer')
    renderer.plugins[name] = renderer.type === PIXI.RENDERER_TYPE.WEBGL
      ? new ShaderPlugin(renderer) : new PIXI.CanvasSpriteRenderer(renderer)
  }
}

function createShaderPluginSprite (name, size, uniforms) {
  var sprite = new PIXI.Sprite()

  sprite.pluginName = name
  sprite.pluginSize = size
  sprite.pluginUniforms = uniforms || {}

  return sprite
}

export default {createShaderPlugin, createShaderPluginSprite}
