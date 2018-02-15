Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :climbs, only: [:create] do
        get 'home_todos', on: :collection
        get 'home_ticks', on: :collection
        get 'todos', on: :collection
        get 'ticks', on: :collection
        get 'search', on: :collection
      end

      resources :comments, only: [:update] do
        patch 'completed', on: :collection
      end
      resources :to_dos, only: [:update, :destroy]

    end
  end

  root 'homes#index'
  get "*path", to: "homes#index"
end
