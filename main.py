import eel
import torch
import matplotlib.pyplot as plt




eel.init('the_drawing_app[GUI]')
trained_Model_Path = "backendModels/trained_models/digitLinearModel.pth"



import torch.nn as nn
import torch.nn.functional as F
class MNISTModel(nn.Module):
    def __init__(self,input_neurons,hidden_neurons, output):
        super().__init__()
        self.lyr_1 = nn.Linear(input_neurons, hidden_neurons)
        self.lyr_2 = nn.Linear(hidden_neurons, output)

    def forward(self, xbtch):
        xbtch = xbtch.view(xbtch.size(0), -1) 
        out = self.lyr_1(xbtch)
        out = F.relu(out) #apply relu on the output
        out = self.lyr_2(out)
        return out

    def training_step(self, btch):
        imgs, labels = btch
        out = self(imgs) #run the forward method on the images
        loss = F.cross_entropy(out, labels)
        return loss

    def validation_step(self, btch):
        imgs, labels = btch
        out =self(imgs)
        loss = F.cross_entropy(out, labels)
        acc = accuracy(out, labels)
        return {'val_acc':acc, 'val_loss':loss}

    
    def validation_epoch_end(self, outputs):
        btch_losses = [x['val_loss'] for x in outputs]
        btch_acc = [x['val_acc'] for x in outputs]
        # combine the losses & accuracies
        epoch_loss = torch.stack(btch_losses).mean() 
        epoch_acc = torch.stack(btch_acc).mean()
        return {'val_loss':epoch_loss.item(), 'val_acc':epoch_acc.item()}

    def epoch_end(self, epoch, results):
        print(f"Epoch [{epoch}], validation_loss: {results['val_loss']:4f}, valdation_acc: {results['val_acc']:4f}")
    

def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))

def evaluate(model,val_loader):
    outputs = [model.validation_step(btch) for btch in val_loader]
    return model.validation_epoch_end(outputs)

model = torch.load(trained_Model_Path, map_location=torch.device('cpu'))

@eel.expose
def make_prediction(imgArr):
    imgArr = torch.FloatTensor(imgArr)
    '''displaying plot of retuning array'''
    # plt.figure() 
    # plt.imshow(imgArr)
    # plt.show()
    imgArr = imgArr.reshape(1,-1)
    predicted = model(imgArr)
    predicted_pow, index = torch.max(predicted,axis=1)
    # print("=="*10)
    # print(index.item())
    # print(predicted_pow.item())

    return predicted_pow.item(), index.item()


eel.start('main.html')