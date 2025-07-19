import GlideLib from '~libs/glideLib';
import '~components/cart';
import '~components/header';
import '~components/selector';
import '~components/toggle';
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