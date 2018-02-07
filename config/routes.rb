Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :climbs, only: [:create] do
        get 'todo', on: :collection
      end
    end
  end

  root 'homes#index'
  get "*path", to: "homes#index"
end
