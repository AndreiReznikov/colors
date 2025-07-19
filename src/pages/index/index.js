import GlideLib from '~libs/glideLib';
import '~components/header';
import '~templates/fonts.scss';

import './index.scss';

class Colors {
  initializePlugins() {
    this._initializeGlide();
  }

  _initializeGlide() {
    this.glide = new GlideLib()
    this.glide.initializePlugin('.js-glide', { animationDuration: 1200 });
  }
}

const colors = new Colors();

colors.initializePlugins();