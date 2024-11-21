local dinamometro = script.Parent -- armazanemento do dinamometro
local debounce = false -- flag pro dinamometro iniciar diversas vezes ao msm tempo
local powerDisplayTime = 5 -- tempo que o display vai aparecer pro jogador

-- função p calcular a potência do carro do jogador
local function startMeasurement(car, player)
    local aChassisScript = car:FindFirstChild("A-Chassis Script") -- procura o pluguin a-chassis que fica na roda do carro
    if aChassisScript then -- verifica se o pluguin foi achado
        local rpm = 0 -- inicia a variavel de rpm do motor como 0
        local torque = 0 -- inicia a variavel de torque do motor como 0
        
        -- esse loop vai ser executado enquanto o rpm do motor for menor que o RPM máximo do motor ( de acordo com o a-chassis )
        while rpm < aChassisScript.MaxRPM.Value do -- 
            rpm = aChassisScript.RPM.Value
            torque = aChassisScript.Torque.Value
            wait(0.1)
        end
        
        -- formula pra calcular a potência do motor
        local power = (rpm * torque) / 5252
        
        -- variaveis pra exibir a box p jogador 
        local gui = Instance.new("ScreenGui") -- interface gráfica
        local frame = Instance.new("Frame") -- box pros elementos exibidos
        local textLabel = Instance.new("TextLabel") -- texto que mostrará a potencia
        
        gui.Parent = player:WaitForChild("PlayerGui") -- interface ficará visivel na tela do jogador
        frame.Parent = gui -- opuxa a variavel gui logo acima
        frame.Size = UDim2.new(0.3, 0, 0.1, 0) -- define o tamanho da box
        frame.Position = UDim2.new(0.35, 0, 0.45, 0) -- posição da box
        frame.BackgroundColor3 = Color3.fromRGB(0, 0, 0) -- cor de fundo 
        frame.BackgroundTransparency = 0.7 -- transparencia
        
        textLabel.Parent = frame -- adiciona o txtlabel ao frame ( box ) 
        textLabel.Size = UDim2.new(1, 0, 1, 0) -- ocupara todo o tamanho da box
        textLabel.Text = "Potência do Carro: " .. math.floor(power) .. " HP" -- vai mostrar a potencia do carro na box e antes disso vai arredondar pro mais proximo usando o math floor
        textLabel.TextColor3 = Color3.fromRGB(255, 255, 255) -- cor do texto
        textLabel.Font = Enum.Font.SourceSansBold -- tipo de fonte
        textLabel.TextScaled = true -- texto vai ocupar toda a area possivel 

        wait(powerDisplayTime) -- vai esperar o tempo determinado no inicio do código
        gui:Destroy() -- após o tempo a box vai ser destruida ( sumir ) 
    else -- caso a verificação do IF não funcione, esse código abaixo vai ser exibido
        warn("O script do A-Chassis não foi encontrado no carro.")
    end
end

-- evento p saber quando o jogador subir no dinamometro 
dinamometro.Touched:Connect(function(hit)
    if hit:IsA("VehicleSeat") then -- verifica se foi um carro que subiu
        local car = hit.Parent -- verifica o modelo do carro
        local player = game.Players:GetPlayerFromCharacter(hit.Parent) -- verifica o player, pra um possivel dashboard de potencias...
        
        if not debounce then -- verifica se o debounce ta desativado, se sim, ele ativa...evita cliques duplos
            debounce = true
            local prompt = Instance.new("ProximityPrompt", dinamometro) -- linha pra informar ao jogador que ele deve segurar o E
            prompt.ActionText = "Pressione e segure [E] para iniciar a medição"
            prompt.ObjectText = "Dinamômetro"
            prompt.HoldDuration = 2 -- Ttempo de pressionamento do E

            prompt.Triggered:Connect(function() -- quando o jogador terminar o E, o prompt é excluido e a função abaixo é chamado e calcula a potencia do carro
                prompt:Destroy()
                startMeasurement(car, player)
                debounce = false -- debounce desligado pra poder permitir novas interações com o dinamometro
            end)
        end
    end
end)
