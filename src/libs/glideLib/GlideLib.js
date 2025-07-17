import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

class GlideLib {
  initializePlugin(className, options) {
    return new Glide(className, options).mount();
  }
}

export default GlideLib;