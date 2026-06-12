import { ref } from 'vue'

const currentView = ref('home')

export function usePage() {
  function navigate(view) {
    currentView.value = view
  }

  return { currentView, navigate }
}
