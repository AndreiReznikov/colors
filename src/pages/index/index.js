import GlideLib from '~libs/glideLib';
import '~templates/fonts.scss';

import './index.scss';

class Colors {
  initializePlugins() {
    this._initializeGlide();
  }

  _initializeGlide() {
    this.glide = new GlideLib()
    this.glide.initializePlugin('.js-glide');
  }
}

const colors = new Colors();

colors.initializePlugins();