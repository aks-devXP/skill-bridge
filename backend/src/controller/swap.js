const SwapRequest = require('../models/SwapRequest');
const AdminActions = require('../models/AdminActions');

exports.createSwapRequest = async (req, res) => {
  try {
    const { receiver, skillOffered, skillRequested, message } = req.body;

    const newRequest = await SwapRequest.create({
      sender: req.user._id,
      receiver,
      skillOffered,
      skillRequested,
      message
    });

    res.status(201).json({ message: 'Swap request sent', request: newRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send request' });
  }
};

exports.getMySwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
      //.populate('sender receiver skillOffered skillRequested')
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your requests' });
  }
};

exports.getAllSwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find()
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      // .populate('skillOffered skillRequested') remove if Skill model exists
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error('[ADMIN] Swap Fetch Error:', error.message); // log the real error
    res.status(500).json({ error: 'Failed to fetch swap requests' });
  }
};


exports.deleteSwapRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const deleted = await SwapRequest.findByIdAndDelete(requestId);
    if (!deleted) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    await AdminActions.create({
      actionType: 'reject_swap',
      performedBy: req.user._id,
      targetModel: 'SwapRequest',
      targetId: requestId,
      note: 'Swap request rejected/deleted by admin'
    });

    res.json({ message: 'Swap request deleted by admin' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete request' });
  }
};
