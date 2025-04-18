export const initialState = {
  timersByCategory: {},
  history: []
};

export function timerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TIMER': {
      const { name, duration, category, halfwayAlert } = action.payload;
      const id = Date.now().toString();
      const timer = {
        id,
        name,
        duration,
        remaining: duration,
        category,
        status: 'Idle',
        halfwayAlert,
        halfwayTriggered: false
      };

      return {
        ...state,
        timersByCategory: {
          ...state.timersByCategory,
          [category]: [...(state.timersByCategory[category] || []), timer]
        }
      };
    }

    case 'UPDATE_TIMER': {
      const { category, id, updates } = action.payload;
      return {
        ...state,
        timersByCategory: {
          ...state.timersByCategory,
          [category]: state.timersByCategory[category].map(timer =>
            timer.id === id ? { ...timer, ...updates } : timer
          )
        }
      };
    }

    case 'TICK_TIMER': {
      const { category, id } = action.payload;
      return {
        ...state,
        timersByCategory: {
          ...state.timersByCategory,
          [category]: state.timersByCategory[category].map(timer =>
            timer.id === id
              ? { ...timer, remaining: Math.max(timer.remaining - 1, 0) }
              : timer
          )
        }
      };
    }

    case 'RESET_TIMER': {
      const { category, id } = action.payload;
      return {
        ...state,
        timersByCategory: {
          ...state.timersByCategory,
          [category]: state.timersByCategory[category].map(timer =>
            timer.id === id
              ? { ...timer, remaining: timer.duration, status: 'Idle', halfwayTriggered: false }
              : timer
          )
        }
      };
    }

    case 'COMPLETE_TIMER': {
      const { timer } = action.payload;
      return {
        ...state,
        history: [...state.history, { name: timer.name, completedAt: new Date().toISOString() }]
      };
    }

    default:
      return state;
  }
}
