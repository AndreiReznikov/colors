import GlideLib from '~libs/glideLib';
import '~components/cart';
import '~components/header';
import '~components/selector';
import '~components/card-list';
import '~components/toggle-list';

import './index.scss';
import axios from 'axios';
import { store } from '../../store';
import { setProducts } from '../../reducers/products';

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

axios(`https://${process.env.MOCK_API_SECRET}.mockapi.io/api/products`)
  .then((response) => {
    store.dispatch(setProducts(response.data));
  });