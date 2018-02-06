Rails.application.routes.draw do
  devise_for :users

  root 'homes#index'
  get "*path", to: "homes#index"
end
