export default {
  namespaced: true,
  state: {
    carts: [],
  },
  mutations: {
    insert: (state, payload) => {
      console.log('Weight:', payload.weight, 'insert');
      state.carts.push({
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: 1,
      });
    },
    update: (state, payload) => {
      console.log('Weight:', payload.weight, 'update');
      let idx = state.carts.indexOf(payload);
      state.carts.splice(idx, 1, {
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: payload.quantity ++,
      });
      if (payload.quantity<=0){
        state.carts.splice(idx,1)
      }
    },
    Set: (state,payload) =>{
      state.carts = payload
    },
  },
  actions: {
    add: ({ state, commit }, payload) => {
      let cartItem = state.carts.find((item) => item.id === payload.id);
      if (!cartItem) {
        commit("insert", payload);
      } else {
        cartItem.quantity++
        commit("update", cartItem);
      }
    },
    remove: ({ state, commit }, payload) => {
      const cartItem = state.carts.find((item) => item.id === payload.id);
      if (cartItem) {
        commit('update', { ...cartItem, quantity: cartItem.quantity - 1 });
      }
    },
    
  },
  getters: {
    carts: (state) => state.carts,
    count: (state) => state.carts.length,
    totalQuantity: (state) =>
      state.carts.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.carts.reduce((total, item) => total + item.price * item.quantity, 0),
    totalWeight: (state) =>
      state.carts.reduce((total, item) => total + item.weight * item.quantity, 0),
  },
};