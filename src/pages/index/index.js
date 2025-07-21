import GlideLib from '~libs/glideLib';
import '~components/cart';
import '~components/header';
import '~components/selector';
import '~components/card-list';
import '~components/toggle-list';

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

// store.subscribe("SET_SORT_TYPE", (state) => {
//   console.log(state);
//   axios('https://687e0e42c07d1a878c31110c.mockapi.io/api/products', {
//     params: state,
//   })
//     .then((response) => {
//       console.log(response.data);
//     });
// });

// store.subscribe("SET_FILTERS", async (state = []) => {
//   console.log(state);
//   try {
//     const params = {};

//     state.forEach((filter) => params[filter] = true);

//     const url = 'https://687e0e42c07d1a878c31110c.mockapi.io/api/products';
//     const response = await axios.get(url, { params });

//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Ошибка:', error);
//     return [];
//   }
// });